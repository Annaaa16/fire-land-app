import { useDispatch } from 'react-redux';

// types
import { StoreDispatch } from '@/models/store';

const useStoreDispatch = () => useDispatch<StoreDispatch>();

export default useStoreDispatch;
