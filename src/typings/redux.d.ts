import "react-redux";
import { ReduxState } from "../redux/createStore";

// ______________________________________________________
//
declare module "react-redux" {
  interface DefaultRootState extends ReduxState {}
}
