import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';

import FixtureHeader from './FixtureHeader.jsx';
import FixtureTeams from './FixtureTeams.jsx';
import FixtureVenue from './FixtureVenue.jsx';
import Button from '../../utils/Button.jsx';
import './FixtureDetails.css';

const FixtureDetails = ({ onCancel, onAddResult, routeData }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const { request, error, setError, isLoading } = useFetch();

    const [data, setData] = useState({ ...routeData });
    const [editData, setEditData] = useState({
        date: data.fixture.formattedDate,
        time: data.fixture.time,
        venue: data.fixture.venue,
        field: data.fixture.field,
    }); // TODO: date and time should be date and time pickers respectively and not edit fields
    const editDataRef = useRef(null);

    useEffect(() => {
        editDataRef.current = editData;
    }, [editData]);

    const { _id, awayTeam, homeTeam, formattedDate, time, venue, field } =
        data.fixture;

    const league = {
        _id: data.fixture.league,
        creator: data.creator,
        name: data.name,
    };

    const handleEditField = (field, value) => {
        setEditData((prevData) => {
            const newData = { ...prevData };
            newData[field] = value;
            return newData;
        });
    };

    // check if the user is the league creator to be able to edit the fixture details
    const isCreator = league.creator === user._id;

    const handleSaveChanges = useCallback(async () => {
        // reset the error if any
        setError('');

        // ignore the date and time fields if their values are TBC
        const filteredData = { ...editDataRef.current };
        if (filteredData.date === 'TBC') filteredData.date = undefined;
        if (filteredData.time === 'TBC') filteredData.time = undefined;

        // send the request with the editted data
        const response = await request(
            `/fixtures/${_id}`,
            'patch',
            filteredData,
            { params: { leagueId: league._id } }
        );

        if (response) {
            // set the data to be the response of this data
            setData({ ...response.data });

            // show the success alert
            dispatch(showAlert('success', 'Update successful'));
        }
    }, []);

    // disable the save button if any of the data in the edit data state
    //  is not the same as the data that came from the loader
    let disableSave = false;
    if (
        editData.date === formattedDate &&
        editData.time === time &&
        editData.venue === venue &&
        editData.field === field
    ) {
        disableSave = true;
    }

    // disable the save button if there are any empty field
    if (
        !editData.date ||
        !editData.time ||
        !editData.venue ||
        !editData.field
    ) {
        disableSave = true;
    }

    return (
        <main>
            <FixtureHeader
                onEdit={handleEditField}
                editData={editData}
                league={league}
                fixtureDate={formattedDate}
                fixtureTime={time}
            />

            <FixtureTeams
                leagueId={league._id}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
            />

            <FixtureVenue
                onEdit={handleEditField}
                editData={editData}
                leagueCreator={league.creator}
                fixtureVenue={venue}
                fixtureField={field}
            />

            {error && <p className="error-message">{error}</p>}
            {isAuth && isCreator && (
                <section className="fixture-details__buttons">
                    <div className="fixture-details__btn-add">
                        <Button onClick={onAddResult}>Add result</Button>
                    </div>
                    <div className="fixture-details__btn-save">
                        <Button
                            disabled={isLoading || disableSave}
                            onClick={handleSaveChanges}
                            loading={isLoading}
                        >
                            Save
                        </Button>
                    </div>
                    <div className="fixture-details__btn-cancel">
                        <Button onClick={onCancel} type="no-bg">
                            Cancel
                        </Button>
                    </div>
                </section>
            )}
        </main>
    );
};

export default FixtureDetails;
