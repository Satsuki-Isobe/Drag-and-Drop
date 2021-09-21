import React, { useState } from "react";
import "./styles.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { data } from "./data/data";

export default function App() {
  const [obj, setObj] = useState(data);

  function event(result) {
    // console.log(result);
    const { destination, source } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      // 元のソースから削除
      const newSourceObj = obj[source.droppableId];
      const copiedSObj = [...newSourceObj.items];
      const [reorderObj] = copiedSObj.splice(source.index, 1);

      // 移動先へ追加
      const newDestinationObj = obj[destination.droppableId];
      const copiedDObj = [...newDestinationObj.items];
      copiedDObj.splice(destination.index, 0, reorderObj);

      setObj({
        ...obj,
        [source.droppableId]: {
          ...newSourceObj,
          items: copiedSObj
        },
        [destination.droppableId]: {
          ...newDestinationObj,
          items: copiedDObj
        }
      });
    } else {
      // 元のソースから削除＆追加　＝　更新
      const newSourceObj = obj[source.droppableId];
      const copiedSObj = [...newSourceObj.items];
      const [reorderObj] = copiedSObj.splice(source.index, 1);
      copiedSObj.splice(destination.index, 0, reorderObj);
      setObj({
        ...obj,
        [source.droppableId]: {
          ...newSourceObj,
          items: copiedSObj
        }
      });
    }
  }
  return (
    <>
      <div
        style={{
          width: `100%`,
          display: `flex`,
          justifyContent: `center`,
          gap: `10px`,
          margin: `20px 0 0 0`
        }}
      >
        <DragDropContext onDragEnd={(result) => event(result)}>
          {Object.keys(obj).map((res, index) => {
            // console.log(obj[res]);
            return (
              <Droppable droppableId={`${res}`} key={res}>
                {(provided, snapshot) => (
                  <div style={{ width: "30%" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "12px",
                        background: `${obj[res].color}`,
                        borderRadius: "4px",
                        margin: "0 0 12px 8px",
                        padding: "4px 6px"
                      }}
                    >
                      {obj[res].name}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        fontWeight: "600",
                        fontSize: "11px",
                        color: "#838383",
                        margin: "0 0 0 8px",
                        padding: "4px"
                      }}
                    >
                      {obj[res].items.length}
                    </span>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#f4f4f4"
                          : "#fff",
                        borderRadius: "4px",
                        padding: 4,
                        width: "100%",
                        minHeight: 400
                      }}
                    >
                      {obj[res].items.map((res, index) => {
                        // console.log(res);
                        return (
                          <Draggable
                            draggableId={res.name}
                            key={res.name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  userSelect: "none",
                                  fontWeight: 600,
                                  padding: 8,
                                  borderRadius: `4px`,
                                  border: `solid 1px #e0e0e0`,
                                  margin: `0 0 8px 0`,
                                  background: snapshot.isDragging
                                    ? `#ffffff`
                                    : `#ffffff`,
                                  color: `#444444`,
                                  ...provided.draggableProps.style
                                }}
                              >
                                {res.sex === "male" ? `🙋‍♂️` : `🙋‍♀️`} {res.name}(
                                {res.age})
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}
