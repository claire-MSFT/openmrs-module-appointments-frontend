import {getComponentsDisableStatus} from "./DisableComponentsHelper";
import {CHECKED_IN_APPOINTMENT_STATUS, SCHEDULED_APPOINTMENT_STATUS} from "../../constants";

describe('Disable components helper', () => {
    it('should disable service and speciality when appointment status is scheduled and isServiceOnAppointmentEditable ' +
        'config is false', () => {
        const componentDisableStatus = getComponentsDisableStatus({status: SCHEDULED_APPOINTMENT_STATUS}, false);

        expect(componentDisableStatus.service).toBeTruthy();
        expect(componentDisableStatus.speciality).toBeTruthy();
    });

    it('should disable service and speciality when appointment status is not scheduled or checked in and ' +
        'isServiceOnAppointmentEditable config is true', () => {
        const componentStatus = getComponentsDisableStatus({status: 'random-status'}, true);

        expect(componentStatus.service).toBeTruthy();
        expect(componentStatus.speciality).toBeTruthy();
    });

    it('should enable service and speciality when appointment status is scheduled and ' +
        'isServiceOnAppointmentEditable config is true', () => {
        const componentStatus = getComponentsDisableStatus({status: CHECKED_IN_APPOINTMENT_STATUS}, true);

        expect(componentStatus.service).toBeFalsy();
        expect(componentStatus.speciality).toBeFalsy();
    });

    it('should disable service and speciality when appointment status is not scheduled or checked in and ' +
        'isServiceOnAppointmentEditable config is false', () => {
        const componentStatus = getComponentsDisableStatus({status: 'random-status'}, false);

        expect(componentStatus.service).toBeTruthy();
        expect(componentStatus.speciality).toBeTruthy();
    });

    it('should disable service and speciality when appointment status is not scheduled or checked in and ' +
        'isServiceOnAppointmentEditable config is not provided', () => {
        const componentStatus = getComponentsDisableStatus({status: 'random-status'}, undefined);

        expect(componentStatus.service).toBeTruthy();
        expect(componentStatus.speciality).toBeTruthy();
    });

    it('should disable location, providers, service type, start date, time, occurrences and end date' +
        'when appointment status is not scheduled or checked in', () => {
        const componentStatus = getComponentsDisableStatus({status: 'Missed'});

        expect(componentStatus.serviceType).toBeTruthy();
        expect(componentStatus.providers).toBeTruthy();
        expect(componentStatus.location).toBeTruthy();
        expect(componentStatus.startDate).toBeTruthy();
        expect(componentStatus.time).toBeTruthy();
        expect(componentStatus.occurrences).toBeTruthy();
        expect(componentStatus.endDate).toBeTruthy();

    });

    it('should enable location, providers, service type, start date, time, occurrences and end date' +
        'when appointment status is scheduled', () => {
        const componentStatus = getComponentsDisableStatus({status: SCHEDULED_APPOINTMENT_STATUS});

        expect(componentStatus.serviceType).toBeFalsy();
        expect(componentStatus.providers).toBeFalsy();
        expect(componentStatus.location).toBeFalsy();
        expect(componentStatus.startDate).toBeFalsy();
        expect(componentStatus.time).toBeFalsy();
        expect(componentStatus.occurrences).toBeFalsy();
        expect(componentStatus.endDate).toBeFalsy();
    });

    it('should enable location, providers, service type start date, time, occurrences and end date' +
        ' when appointment status is checked in', () => {
        const componentStatus = getComponentsDisableStatus({status: CHECKED_IN_APPOINTMENT_STATUS});

        expect(componentStatus.serviceType).toBeFalsy();
        expect(componentStatus.providers).toBeFalsy();
        expect(componentStatus.location).toBeFalsy();
        expect(componentStatus.startDate).toBeFalsy();
        expect(componentStatus.time).toBeFalsy();
        expect(componentStatus.occurrences).toBeFalsy();
        expect(componentStatus.endDate).toBeFalsy();
    });

    it('should disable location, providers, service, speciality, service type start date, time, occurrences ' +
        'and end date when appointment status is checked in', () => {
        const componentStatus = getComponentsDisableStatus(
            {status: CHECKED_IN_APPOINTMENT_STATUS,
            //year 2007
            startDateTime: new Date(1174166254)}
            );

        expect(componentStatus.serviceType).toBeTruthy();
        expect(componentStatus.providers).toBeTruthy();
        expect(componentStatus.location).toBeTruthy();
        expect(componentStatus.startDate).toBeTruthy();
        expect(componentStatus.time).toBeTruthy();
        expect(componentStatus.occurrences).toBeTruthy();
        expect(componentStatus.endDate).toBeTruthy();
    });
});
