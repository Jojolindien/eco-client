import { useEffect, useState } from "react";
import AdminNav from "../../component/nav/AdminNav";
import { getCategories } from "../../functions/category";
import { Card } from "antd";

const AdminDashboard = () => {
  // return (
  //   <div className="container-fluid">
  //     <div className="row my-5">
  //       <div className="col-md-2">
  //         <AdminNav />
  //       </div>

  //       <div className="col">
  //         <h4>Dashboard</h4>
  //       </div>
  //     </div>
  //   </div>
  // );

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour charger les catégories lors du montage du composant
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        console.log(response.data);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading categories", error);
        setLoading(false);
      }
    };

    loadCategories();
  }, []); // Le tableau vide [] assure que cette fonction ne sera exécutée qu'une fois lors du montage initial du composant

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Categories</h4>

          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="row">
              {categories.map((category) => (
                <div key={category._id} className="col-md-4 mb-4">
                  <Card
                    title="Card title"
                    bordered={false}
                    style={{
                      width: 300,
                    }}
                  >
                    {category.name}
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
