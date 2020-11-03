import "react-redux";
import { ReduxState } from "../redux/redux";

// ______________________________________________________
//
declare module "react-redux" {
  interface DefaultRootState extends ReduxState {}
}
