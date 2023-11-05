import { Link } from "react-router-dom";
import styled from "styled-components";

/* ButtonStyles.css */
export const LinkBtnStyle = styled(Link)`
  position: relative;
  float: left;
  padding: 10px 20px;
  background-color: white;
  color: #bb86fc;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;
