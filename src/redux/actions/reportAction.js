import {
    merchantIncomeUrl,
    merchantWithdrawUrl,
    studentExpensesUrl,
    studentWalletUrl,
} from '../../configurations/urlConfigurations';
import {httpPost} from '../services/httpServices';
import {
    merchantIncomeActionTypes, merchantWithdrawActionTypes,
    resetReportActionTypes,
    studentExpensesActionTypes,
    studentWalletActionTypes,
} from '../types';


export const studentWalletAction = data => {
    return httpPost({
        url: studentWalletUrl,
        actionTypes: studentWalletActionTypes,
        data,
        isAuth: true,
    });
};


export const studentExpensesAction = data => {
    return httpPost({
        url: studentExpensesUrl,
        actionTypes: studentExpensesActionTypes,
        data,
        isAuth: true,
    });
};

export const merchantIncomeAction = data => {
    return httpPost({
        url: merchantIncomeUrl,
        actionTypes: merchantIncomeActionTypes,
        data,
        isAuth: true,
    });
};

export const merchantWithdrawAction = data => {
    return httpPost({
        url: merchantWithdrawUrl,
        actionTypes: merchantWithdrawActionTypes,
        data,
        isAuth: true,
    });
};

export const resetReportAction = () => {
    return {
        type: resetReportActionTypes.RESET_ACTION,
    };
};


