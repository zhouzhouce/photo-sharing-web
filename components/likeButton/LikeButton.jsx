import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import styles from "../../styles/LikeButton.module.css";


const particleList = Array.from(Array(10));

export default function LikeButton() {
    const [liked, setLiked] = useState(null);
    const [clicked, setClicked] = useState(false);
    return(
            <button
              onClick={() => {
                setLiked(!liked);
                setClicked(true);
              }}
              onAnimationEnd={() => setClicked(false)}
              className={cn("like-button-wrapper", {
                liked,
                clicked,
              })}
            >
              {liked && (
                <div className="particles">
                  {particleList.map((_, index) => (
                    <div key={index}
                      className="particle-rotate"
                      style={{
                        transform: `rotate(${
                          (360 / particleList.length) * index + 1
                        }deg)`,
                      }}
                    >
                      <div className="particle-tick" />
                    </div>
                  ))}
                </div>
              )}
              <div className="like-button">
                {/* <Hand /> */}
                <span>Like</span>
                <span className={cn("suffix", { liked })}>d</span>
              </div>
            </button>
          );
}
