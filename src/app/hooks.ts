import { useDispatch, useSelector } from 'react-redux'
import { AppDipatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDipatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
