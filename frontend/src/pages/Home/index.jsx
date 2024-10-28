import {Header} from "../../components/Header";
import { Resume } from "../../components/Resume";
import "./styles.css";

export const Home = () => {
  return (
    <div className="container">
        <Header /> 
        <Resume />
    </div>
  );
};
