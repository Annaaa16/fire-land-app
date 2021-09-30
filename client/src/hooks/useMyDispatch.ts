import { useDispatch } from 'react-redux';

// types
import { MyDispatch } from '@/redux/types';

const useMyDispatch = () => useDispatch<MyDispatch>();

export default useMyDispatch;
