const axios = require("axios");

(async () => {
  console.log(
    await axios.get(
      "https://poopoo-api.vercel.app/api/image?url=https://thealiendoctor.com"
    )
  );
})();
