import { memo } from 'react';
import type { FC } from 'react';
import React from 'react';

import resets from '../_resets.module.css';
import { Ellipse107Icon } from './Ellipse107Icon.js';
import classes from './Frame250.module.css';

import { JSONData, Sticky } from '../../types';

interface Props {
  className?: string;
  data: JSONData;
}

// 좌표 변환 함수
function scaleToQuarterScreen(x: number, y: number) {
  const screenWidth = 1920;
  const screenHeight = 1080;
  const boxWidth = 1020;
  const boxHeight = 686;

  // 전체 화면 대비 스케일링
  const scaleX = boxWidth / screenWidth;
  const scaleY = boxHeight / screenHeight;

  // 좌표를 스케일링하고 왼쪽 하단으로 변환
  const scaledX = x * scaleX;
  const scaledY = (screenHeight - boxHeight) + (y * scaleY);

  return {
    x: scaledX,
    y: scaledY,
  };
}

/* @figmaId 65:2276 */
export const Frame250: FC<Props> = memo(function Frame250({ data, className }: Props) {
  const { generated_concepts, generated_summary, generated_images } = data;

  const generatedImages = data.generated_images;

  // 첫 번째 이미지 URL 가져오기
  const imageUrl = generatedImages.length > 0 ? generatedImages[0].url : '';
  // 두 번째 이미지 URL 가져오기
  const imageUrl2 = generatedImages.length > 1 ? generatedImages[1].url : '';

  // 첫 번째 동적 CSS 클래스 생성
  const dynamicCssClass = `
    .rectangle74 {
      position: absolute;
      left: 1055px;
      top: 660px;
      width: 418px;
      height: 418px;
      border-radius: 18px;
      background-image: url(${imageUrl});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  `;

  // 두 번째 동적 CSS 클래스 생성
  const dynamicCssClass2 = `
    .rectangle80 {
      position: absolute;
      right: 0px;
      top: 660px;
      width: 418px;
      height: 418px;
      border-radius: 18px;
      background-image: url(${imageUrl2});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  `;

  // 첫 번째 동적 CSS 클래스를 문서의 <head>에 삽입
  const styleElement = document.createElement('style');
  styleElement.innerHTML = dynamicCssClass;
  document.head.appendChild(styleElement);

  // 두 번째 동적 CSS 클래스를 문서의 <head>에 삽입
  const styleElement2 = document.createElement('style');
  styleElement2.innerHTML = dynamicCssClass2;
  document.head.appendChild(styleElement2);

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle72}></div>
      {/* Generated Images */}
      <div className={`rectangle74`}></div>
      <div className={`rectangle80`}></div>
      <div className={classes.rectangle79}></div>
      <div className={classes.titleOfTheConcent}>
        {/* Title of the content */}
        {data.stickies.find(sticky => sticky.isTheme)?.text}
      </div>
      <div className={classes.rectangle73}></div>
      <div className={classes.line59}></div>
      <div className={classes.line60}></div>

      {/* 포스트잇 위치 변환 */}
      <div className="sticky-container">
        {data.stickies.map((sticky: Sticky, index: number) => {
          // 좌표를 1020x686 크기의 영역에 맞게 스케일링
          const { x, y } = scaleToQuarterScreen(sticky.x, sticky.y);

          return (
            <React.Fragment key={`${index}-${sticky.x}-${sticky.y}`}>
              {/* 박스 */}
              <div
                className={`sticky-box ${sticky.isTheme ? 'theme' : 'nottheme'}`}
                style={{
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y}px`,
                  width: `${sticky.w}px`,
                  height: `${sticky.h}px`,
                  border: '1px solid black',
                }}
              ></div>

              {/* 박스 아래 레이블 */}
              <div
                className="sticky-label"
                style={{
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y + sticky.h + 5}px`, // 박스 아래에 표시
                  fontSize: '14px', // 글자 크기
                  backgroundColor: 'white', // 배경색 추가
                  padding: '2px 5px', // 텍스트 주변 여백 확보
                  border: '1px solid black', // 테두리 추가
                }}
              >
                {sticky.text}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className={classes.ellipse107}>
        <Ellipse107Icon className={classes.icon} />
      </div>
      <div className={classes.rectangle732}></div>

      <div className={classes.concept01Detail}>
        <br />
        <div>
          <p>{generated_concepts[0].details}</p>
        </div>
      </div>

      <div className={classes.rectangle82}></div>
      <div className={classes.concept02Detail}>
        <br />
        <div>
          <p>{generated_concepts[1].details}</p>
        </div>
      </div>

      <div className={classes.rectangle81}></div>
      <div className={classes.summaryTitle}>Summary</div>
      <div className={classes.summaryDetails}>
        <br />
        <br />
        <div>{generated_summary[0].details}</div>
      </div>
    </div>
  );
});
