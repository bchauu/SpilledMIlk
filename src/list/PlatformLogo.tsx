import React from "react";

interface PlatformLogoProps {
  platform: String;
}

const PlatformLogo: React.FC<PlatformLogoProps> = (props) => {
  const platform = props.platform;

  return (
    <div>
      {platform == "prime" ? (
        <img
          className="icon"
          src="https://cdn.realscreen.com/wp/wp-content/uploads/2021/02/primevideo-seo-logo-square.jpg"
        />
      ) : platform == "disney" ? (
        <img
          className="icon"
          src="https://williamsonsource.com/wp-content/uploads/2019/12/disney-plus-logo-1547x1030.jpg"
        />
      ) : platform == "apple" ? (
        <img
          className="icon"
          src="https://i.insider.com/55f0a291dd08957b5a8b46f6?width=600&format=jpeg&auto=webp"
        />
      ) : platform == "netflix" ? (
        <img
          className="icon"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg"
        />
      ) : platform == "hbo" ? (
        <img
          className="icon"
          src="https://media.idownloadblog.com/wp-content/uploads/2020/05/HBO-Max-logo.jpg"
        />
      ) : platform == "hulu" ? (
        <img
          className="icon"
          src="https://www.techadvisor.com/wp-content/uploads/2022/11/hulu-2.jpg?quality=50&strip=all"
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PlatformLogo;
