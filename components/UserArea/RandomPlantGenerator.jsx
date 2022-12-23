import { useEffect, useState } from "react";

import { getPlantById } from "../../api/api";
import MyPlantModal from "./MyPlantModal";

const randomPlantGenerator = (id) => {
  const [plant, setPlant] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    getPlantById(id)
      .then((res) => {
        if (res.common_name !== "N/A") {
          setPlant(res);
        }
        getPlantById(id + 1);
      })
      .catch((err) => {
        setError(
          "Whoops! Something went wrong while trying to get Featured Plant. Please check back later."
        );
      });
  }, [id]);

  if (plant) {
    return plant;
  } else {
    return error;
  }
};

export default randomPlantGenerator;
