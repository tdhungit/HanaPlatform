// system app list strings. Admin user can add more app list string in db settings
import {ModulesAppListStrings} from '../modules/app_list_strings.modules';

const CoreAppListStrings = {
    BranchOfficeTypesList: {
        Office: 'Office',
        Warehouse: 'Warehouse'
    },
    DateFormatList: {
        'YYYY-MM-DD': 'YYYY-MM-DD',
        'MM-DD-YYYY': 'MM-DD-YYYY',
        'DD-MM-YYYY': 'DD-MM-YYYY'
    },
    DateTimeFormatList: {
        'YYYY-MM-DD HH:mm': 'YYYY-MM-DD HH:mm',
        'MM-DD-YYYY HH:mm': 'MM-DD-YYYY HH:mm',
        'DD-MM-YYYY HH:mm': 'DD-MM-YYYY HH:mm'
    },
    ActivityTypes: {
        Calls: 'Calls',
        Meetings: 'Meetings',
        Tasks: 'Tasks'
    },
    ConferencingList: {
        Skype: 'Skype',
        Hangout: 'Hangout'
    },
    CalendarEventColor: {
        Calls: '#20a8d8',
        Meetings: '#20a8d8',
        Tasks: '#20a8d8',
    },
    CalendarEventIcon: {
        Calls: 'fa fa-phone',
        Meetings: 'fa fa-check',
        Tasks: 'fa fa-tasks',
    },
};

export const AppListStrings = {
    ...CoreAppListStrings,
    ...ModulesAppListStrings
};
