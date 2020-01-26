import * as React from "react";
import CreateArticle from "../manage/CreateArticle";
import ToolBar from "../manage/ToolBar";
import "../../assets/styles/manage.css";
import { RouteComponentProps } from "react-router-dom";
import Images from "../manage/Images";

type RouteProps = RouteComponentProps<{mode: string}>

type Props = RouteProps;

class ManageView extends React.Component<Props> {
  render() {
    const mode = this.props.match.params.mode;
    let element;
    if(mode === undefined) element = <CreateArticle />;
    else if(mode === "images") element = <Images />;

    return(
      <div id="manage-container">
        <ToolBar mode={mode} />
        <div className="manage-wrapper">
          {element}
        </div>
      </div>
    );
  }
}

export default ManageView;