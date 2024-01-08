import { useEffect, useState } from "react";
import { getProduct, getRelated, productStar } from "../functions/product";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProduct from "../component/cards/SingleProduct";
import ProductCard from "../component/cards/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState({});

  const user = useSelector((state) => state.user, shallowEqual);
  const { slug } = useParams();

  //this useEffect run first
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  // vérifie si l'utilisateur actuel a déjà évalué le produit,
  //et s'il l'a fait, il met à jour l'état star (sinon rien) avec la valeur de l'étoile de cette évaluation existante.
  //postedBy est un indexe dans le tableau ratings
  useEffect(() => {
    if (product.ratings && user) {
      // console.log(product.ratings);
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );

      if (existingRatingObject) {
        // console.log(existingRatingObject);
        setStar(existingRatingObject.star); // current user star
      } else {
        // Si l'utilisateur n'a pas encore évalué le produit, réinitialisez l'étoile à 0.
        setStar(0);
      }
    }
  }, [product.ratings, user, star]);

  //charge le produit sur lequel on a cliqué, lors du 1er useEffect
  //puis charge les produits ayant la meme categorie que le notre
  const loadSingleProduct = () => {
    // console.log("loadproduct");
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // console.log(res.data);
      getRelated(res.data._id).then((res) => {
        setRelated(res);
      });
    });
  };

  // met à jour le vote (state + server to BD)
  const onStarClick = (newRating) => {
    // Utilisez setStar avec la nouvelle valeur newRating, pas l'ancienne star.
    setStar(newRating);
    // console.log(product._id, newRating);
    productStar(product._id, newRating, user.token).then((res) => {
      // console.log(res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          loadSingleProduct={loadSingleProduct}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h5>Related products</h5>
          <hr />
          {related.length ? (
            <div className="row text-center vh-100">
              {related.map((r) => (
                <div key={r._id} className="col-md-2 mx-auto">
                  {/* Utilisez la classe "col-md-4" pour définir la largeur de chaque colonne */}
                  <ProductCard product={r} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">NO RELATED</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
