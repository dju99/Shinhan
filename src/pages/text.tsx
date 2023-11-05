import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface InputBoxProps {
  isHaveInputValue: boolean;
}
interface Store {
  _id: string;
  name: string;
  address: string;
  latlng: { latitude: string; longitude: string };
  url: string;
  number: string;
  time: [];
  type: [];
}

const AutoComplete = () => {
  const TextArray = ["apple", "banana", "coding", "javascript", "원티드", "프리온보딩", "프론트엔드"];
  const [array, setArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(TextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [storeData, setStoreData] = useState<Store[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/store")
      .then((response) => {
        setStoreData(response.data);

        // 서버에서 받은 데이터의 name 값을 추출하여 TextArray 업데이트
        setArray(response.data.map((store: { name: string }) => store.name));
        setDropDownList(array);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = array.filter((textItem) => textItem.includes(inputValue));
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem: React.SetStateAction<string>) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event: { key: string }) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (event.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0) setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  const on = () => {
    console.log(array);
    console.log(TextArray);
  };
  return (
    <WholeBox>
      <button onClick={on}>on</button>
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input type="text" value={inputValue} onChange={changeInputValue} onKeyUp={handleDropDownKey} />
        <DeleteButton onClick={() => setInputValue("")}>&times;</DeleteButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && <DropDownItem>해당하는 단어가 없습니다</DropDownItem>}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={dropDownItemIndex === dropDownIndex ? "selected" : ""}
              >
                {dropDownItem}
              </DropDownItem>
            );
          })}
        </DropDownBox>
      )}
    </WholeBox>
  );
};

const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div<InputBoxProps>`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${(props) => (props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius)};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`;

export default AutoComplete;
