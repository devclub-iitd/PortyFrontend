import React from "react";
import styled from "styled-components";

import CropSquareIcon from "@material-ui/icons/CropSquare";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import CodeIcon from "@material-ui/icons/Code";

const HeaderIconsContainer = styled.div`
  animation: pulse 3s ease infinite alternate,
    nudge 5s linear infinite alternate;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes nudge {
    0%,
    100% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(6px, 10px);
    }

    80% {
      transform: translate(3px, -10px);
    }
  }
`;

const HeaderIcons = () => (
  <HeaderIconsContainer>
    <CropSquareIcon
      style={{ width: "40%", fontSize: "4rem", marginTop: "5%" }}
    />
    <ChangeHistoryIcon
      style={{ width: "60%", marginLeft: "60%", fontSize: "8rem" }}
    />
    <CodeIcon
      style={{
        width: "20%",
        fontSize: "4rem",
        marginTop: `${window.innerWidth < 960 ? "50vh" : "20vh"}`
      }}
    />
  </HeaderIconsContainer>
);

export default HeaderIcons;
