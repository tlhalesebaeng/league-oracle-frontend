import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from '../../../hooks/useFetch.js';
import { showAlert } from '../../../store/ui/alert-slice.js';

import FixtureHeader from '../fixture-header/FixtureHeader.jsx';
import FixtureTeams from '../fixture-teams/FixtureTeams.jsx';
import FixtureVenue from '../fixture-venue/FixtureVenue.jsx';
import Button from '../../../components/app/button/Button.jsx';
import './FixtureDetails.css';

const FixtureDetails = ({ onCancel, onAddResult, leagueData, fixture }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const { request, error, setError, isLoading } = useFetch();
    const [editData, setEditData] = useState({
        date: fixture.formattedDate,
        time: fixture.time,
        venue: fixture.venue,
        field: fixture.field,
    }); // TODO: date and time should be date and time pickers respectively and not edit fields
    const editDataRef = useRef(null);

    // After every editData change, update the editDataRef so that it holds the latest data state
    // On every memoized function we can then use it to get the latest editData state
    useEffect(() => {
        editDataRef.current = editData;
    }, [editData]);

    const handleEditField = useCallback((field, value) => {
        setEditData((prevData) => {
            const newData = { ...prevData };
            newData[field] = value;
            return newData;
        });
    }, []);

    // Check if the user is the league creator to be able to edit the fixture details
    const isCreator = leagueData.creator === user.id;

    const handleSaveChanges = useCallback(async () => {
        // Reset the error if any
        setError('');

        // Ignore the date and time fields if their values are TBC
        const filteredData = { ...editDataRef.current };
        if (filteredData.date === 'TBC') filteredData.date = undefined;
        if (filteredData.time === 'TBC') filteredData.time = undefined;

        // Send the request with the editted data
        const response = await request(
            `/fixtures/${fixture.id}`,
            'patch',
            filteredData
        );

        if (response) {
            // Show the success alert
            dispatch(showAlert('success', 'Update successful'));
        }
    }, []);

    // Memoize the editData fields so that we can avoid rendering components that use them unnecessarily
    const date = useMemo(() => editData.date, [editData.date]);
    const time = useMemo(() => editData.time, [editData.time]);

    // The only things that change often here are the editData venue and field so we only use them as dependencies
    const venueDetails = useMemo(
        () => ({
            onEdit: handleEditField,
            leagueCreator: leagueData.creator,
            fixtureVenue: fixture.venue,
            fixtureField: fixture.field,
            venue: editData.venue,
            field: editData.field,
        }),
        [editData.venue, editData.field]
    );

    // Disable the save button if any of the data in the edit data state
    //  is not the same as the data that came from the loader
    let disableSave = false;
    if (
        date === fixture.formattedDate &&
        time === fixture.time &&
        venueDetails.venue === fixture.venue &&
        venueDetails.field === fixture.field
    ) {
        disableSave = true;
    }

    // Disable the save button if there are any empty field
    if (!date || !time || !venueDetails.venue || !venueDetails.field) {
        disableSave = true;
    }

    return (
        <main className="center wrapper-spacing column">
            <FixtureHeader
                onEdit={handleEditField}
                league={leagueData}
                fixtureDate={fixture.formattedDate}
                fixtureTime={fixture.time}
            />

            <FixtureTeams
                leagueId={leagueData.id}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
            />

            <FixtureVenue venueDetails={venueDetails} />

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
