import { useDispatch } from 'react-redux';

// types
import { MyDispatch } from '@/models/store';

const useMyDispatch = () => useDispatch<MyDispatch>();

export default useMyDispatch;
