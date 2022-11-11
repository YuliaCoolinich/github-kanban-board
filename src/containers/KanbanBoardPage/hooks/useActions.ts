import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import * as actions from '../redux/actions';

const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({ ...actions }, dispatch);
}

export default useActions;