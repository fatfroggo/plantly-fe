import { useEffect, useState } from "react";

import { getPlantById } from "../../api/api";

const randomPlantGenerator = (id) => {
  const [plant, setPlant] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    getPlantById(id)
      .then((res) => {
        if (res.common_name === "N/A") {
          getPlantById(id);
        } else setPlant(res);
      })
      .catch((err) => {
        console.log(err);
        setError(
          "Whoops! Something went wrong while trying to get Featured Plant. Please check back later."
        );
      });
  }, [id]);

  if (error) {
    return error;
  } else {
    return plant;
  }
};

export default randomPlantGenerator;
