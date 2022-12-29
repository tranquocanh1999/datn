import React, { useEffect, useState } from "react";
import { MathComponent } from "mathjax-react";

const MathEquation: React.FC<{ value: string }> = (props): JSX.Element => {
  const { value } = props;
  const [result, setResult] = useState<any>();
  useEffect(() => {
    if (value) {
      const strings = value.split("$");
      if (strings.length % 2 === 0 || strings.length === 1) setResult(value);
      else {
        setResult(
          strings.map((string, index) => {
            if (index % 2 === 0) return string;
            else
              return (
                <MathComponent display={false} tex={String.raw`${string}`} />
              );
          })
        );
      }
    }
  }, [value]);

  return <div className="d-inline">{result}</div>;
};

export default React.memo(MathEquation);
