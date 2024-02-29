import {
    merchantIncomeActionTypes, merchantWithdrawActionTypes,
    resetReportActionTypes,
    studentExpensesActionTypes,
    studentWalletActionTypes,
} from '../types';

const initialState = {
    studentWalletLoading: false,
    studentWalletSuccess: null,
    studentWalletFailed: null,

    studentExpensesLoading: false,
    studentExpensesSuccess: null,
    studentExpensesFailed: null,

    merchantIncomeLoading: false,
    merchantIncomeSuccess: null,
    merchantIncomeFailed: null,

    merchantWithdrawLoading: false,
    merchantWithdrawSuccess: null,
    merchantWithdrawFailed: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        //  **
        case studentWalletActionTypes.REQUEST_ACTION:
            return {
                ...state,
                studentWalletLoading: true,
                studentWalletSuccess: null,
                studentWalletFailed: null,
            };
        case studentWalletActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                studentWalletLoading: false,
                studentWalletSuccess: action.value,
                studentWalletFailed: null,
            };
        case studentWalletActionTypes.FAILED_ACTION:
            return {
                ...state,
                studentWalletLoading: false,
                studentWalletSuccess: null,
                studentWalletFailed: action.value,
            };


        // **
        case studentExpensesActionTypes.REQUEST_ACTION:
            return {
                ...state,
                studentExpensesLoading: true,
                studentExpensesSuccess: null,
                studentExpensesFailed: null,
            };
        case studentExpensesActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                studentExpensesLoading: false,
                studentExpensesSuccess: action.value,
                studentExpensesFailed: null,
            };
        case studentExpensesActionTypes.FAILED_ACTION:
            return {
                ...state,
                studentExpensesLoading: false,
                studentExpensesSuccess: null,
                studentExpensesFailed: action.value,
            };


        // **
        case merchantIncomeActionTypes.REQUEST_ACTION:
            return {
                ...state,
                merchantIncomeLoading: true,
                merchantIncomeSuccess: null,
                merchantIncomeFailed: null,
            };
        case merchantIncomeActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                merchantIncomeLoading: false,
                merchantIncomeSuccess: action.value,
                merchantIncomeFailed: null,
            };
        case merchantIncomeActionTypes.FAILED_ACTION:
            return {
                ...state,
                merchantIncomeLoading: false,
                merchantIncomeSuccess: null,
                merchantIncomeFailed: action.value,
            };


         // **
        case merchantWithdrawActionTypes.REQUEST_ACTION:
            return {
                ...state,
                merchantWithdrawLoading: true,
                merchantWithdrawSuccess: null,
                merchantWithdrawFailed: null,
            };
        case merchantWithdrawActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                merchantWithdrawLoading: false,
                merchantWithdrawSuccess: action.value,
                merchantWithdrawFailed: null,
            };
        case merchantWithdrawActionTypes.FAILED_ACTION:
            return {
                ...state,
                merchantWithdrawLoading: false,
                merchantWithdrawSuccess: null,
                merchantWithdrawFailed: action.value,
            };


        // ** Reset
        case resetReportActionTypes.RESET_ACTION:
            return {
                ...state,
                studentWalletLoading: false,
                studentWalletSuccess: null,
                studentWalletFailed: null,

                studentExpensesLoading: false,
                studentExpensesSuccess: null,
                studentExpensesFailed: null,

                merchantIncomeLoading: false,
                merchantIncomeSuccess: null,
                merchantIncomeFailed: null,

                merchantWithdrawLoading: false,
                merchantWithdrawSuccess: null,
                merchantWithdrawFailed: null,

            };


        default:
            return state;
    }
}
