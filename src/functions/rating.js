import { Rate } from "antd";

//p comme product
const showAverage = (p) => {
  if (p && p.ratings) {
    //ratingsArray stocke la valeur de p.ratings si p est défini, sinon elle est définie comme undefined.
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    //Dans ratingsArray on itere et pousse la valeur de r.star (pas besoin des postedBY etc) dans le tableau total.
    ratingsArray.map((r) => total.push(r.star));

    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced, "LENGHT", length);

    let result = totalReduced / length;
    // console.log("result", result);

    return (
      <div className=" pt-1 pb-3">
        <Rate disabled defaultValue={result} />
        {"( " + p.ratings.length + " )"}
      </div>
    );
  } else {
    console.log("no p");
  }
};

export default showAverage;
