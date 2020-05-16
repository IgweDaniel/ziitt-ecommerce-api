require("dotenv").config();
const contentful = require("contentful-management");

// #SUMMER
// JACKETS
// HOODIES
// TROUSER
// ACCESORIES
// SUITS
const products = [
  {
    id: 1,
    name: "Ecru Overshirt",
    images: [
      "https://images.topman.com/i/TopMan/TM83O13UECR_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83O13UECR_F_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "jackets",
    rating: 6,
    price: 12,
    discount: 0,
    badge: ["sale"],
    sizes: ["xs", "xl", "l"],
  },
  {
    id: 2,
    name: "Stone Paper Touch Jacket",
    images: [
      "https://images.topman.com/i/TopMan/TM64K02USTN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM64K02USTN_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "jackets",
    rating: 6,
    price: 12,
    discount: 0,
    badge: ["sale"],
    sizes: ["xs", "s", "l", "xxl", "xxs"],
  },
  {
    id: 3,
    name: "Mid Wash Corduroy Collar Jacket",
    images: [
      "https://images.topman.com/i/TopMan/TM64P00TBLE_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM64P00TBLE_F_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "jackets",
    rating: 6,
    price: 12,
    discount: 0,
    badge: ["sale"],
    sizes: ["xs", "xxl", "xxs"],
  },
  {
    id: 4,
    name: "Pink Textured Bomber Jacket",
    images: [
      "https://images.topman.com/i/TopMan/TM64K00UPNK_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM64K00UPNK_D_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM64K00UPNK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM64K00UPNK_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "jackets",
    rating: 6,
    price: 12,
    discount: 0,
    badge: ["sale"],
    sizes: ["xs", "xxl", "xxs"],
  },

  // HOODIES
  {
    id: 5,
    name: "Blue Classic Hoodie",
    images: [
      "https://images.topman.com/i/TopMan/TM71L12TBRN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71L12TBRN_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71L12TBRN_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71L12TBRN_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "hoodies",
    rating: 6,
    price: 12,
    discount: 0,
    badge: ["sale"],
    sizes: ["xs", "xxl", "s"],
  },
  {
    id: 6,
    name: "SIGNATURE White Panel Hoodie",
    images: [
      "https://images.topman.com/i/TopMan/TM71C17AWHT_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71C17AWHT_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71C17AWHT_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71C17AWHT_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "hoodies",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["m", "l", "s", "xs"],
  },
  {
    id: 7,
    name: "BIG Pink Ottoman Ribbed Sweatshirt",
    images: [
      "https://images.topman.com/i/TopMan/TM71W44RPNK_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W44RPNK_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W44RPNK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W44RPNK_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "hoodies",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["xs", "l", "s", "xl"],
  },
  {
    id: 8,
    name: "Stone And Black Brushed Check Hoodie",
    images: [
      "https://images.topman.com/i/TopMan/TM71D38RSTN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71D38RSTN_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71D38RSTN_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71D38RSTN_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "hoodies",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["xs", "xxs", "s", "xxl"],
  },

  //TROUSER

  {
    id: 9,
    name: "Grey And White Stripe Trousers",
    images: [
      "https://images.topman.com/i/TopMan/TM68F08TGRY_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F08TGRY_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F08TGRY_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F08TGRY_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "trouser",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["xs", "xxs", "s", "xxl"],
  },
  {
    id: 10,
    name: "Blue Houndstooth Stretch Skinny Trousers",
    images: [
      "https://images.topman.com/i/TopMan/TM68F80TBLE_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F80TBLE_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F80TBLE_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM68F80TBLE_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "trouser",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["s", "l"],
  },
  {
    id: 11,
    name: "Mid Wash Stretch Slim Jeans",
    images: [
      "https://images.topman.com/i/TopMan/TM69C12SMST_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM69C12SMST_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM69C12SMST_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM69C12SMST_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "trouser",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["hot"],
    sizes: ["xxl", "m", "l"],
  },
  {
    id: 12,
    name: "Stone Piped Joggers",
    images: [
      "https://images.topman.com/i/TopMan/TM71W83RSTN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W83RSTN_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W83RSTN_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71W83RSTN_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "trouser",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["xxl", "m", "l"],
  },

  //ACCESORIES

  {
    id: 13,
    name: "CHAMPION Grey Cross Body Bag",
    images: [
      "https://images.topman.com/i/TopMan/TM56U02BGRY_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56U02BGRY_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56U02BGRY_D_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56U02BGRY_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "accesories",
    rating: 6,
    price: 112,
    discount: 0,
    badge: ["new"],
    sizes: ["none"],
  },
  {
    id: 14,
    name: "Black Skinny Braces",
    images: [
      "https://images.topman.com/i/TopMan/TM56W00SBLK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56W00SBLK_D_2.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "accesories",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["none"],
  },

  {
    id: 15,
    name: "Gold Metal Round Sunglasses",
    images: [
      "https://images.topman.com/i/TopMan/TM56S04BGLD_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56S04BGLD_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56S04BGLD_D_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56S04BGLD_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "accesories",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["none"],
  },
  {
    id: 16,
    name: "CHAMPION Black Bucket Hat",
    images: [
      "https://images.topman.com/i/TopMan/TM56J16BBLK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56J16BBLK_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM56J16BBLK_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "accesories",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["none"],
  },

  //SUITS
  {
    id: 17,
    name: "2 Piece Green Slim Fit Warm Handle Suit With Notch Lapels",
    images: [
      "https://images.topman.com/i/TopMan/BUNDLE_87J31UGRN87T31UGRN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J31UGRN87T31UGRN_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J31UGRN87T31UGRN_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J31UGRN87T31UGRN_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "suits",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["xl", "l", "m"],
  },
  {
    id: 18,
    name: "2 Piece Grey Check Super Skinny Fit Suit With Notch Lapels",
    images: [
      "https://images.topman.com/i/TopMan/BUNDLE_87J48UGRY87T48UGRY_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J48UGRY87T48UGRY_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J48UGRY87T48UGRY_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J48UGRY87T48UGRY_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "suits",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["xl", "s", "xxl"],
  },
  {
    id: 19,
    name: "3 Piece Pink Slim Fit Warm Handle Suit With Notch Lapels",
    images: [
      "https://images.topman.com/i/TopMan/BUNDLE_87J33UPNK87W33UPNK_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J33UPNK87W33UPNK_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J33UPNK87W33UPNK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J33UPNK87W33UPNK_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "suits",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "xl"],
  },
  {
    id: 20,
    name: "3 Piece Blue Check Skinny Fit Suit With Peak Lapels",
    images: [
      "https://images.topman.com/i/TopMan/BUNDLE_87J23UBLE87W23UBLE_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J23UBLE87W23UBLE_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J23UBLE87W23UBLE_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/BUNDLE_87J23UBLE87W23UBLE_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "suits",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "s"],
  },

  //SUMMER
  {
    id: 21,
    name: "Black Logo Print Swim Shorts",
    images: [
      "https://images.topman.com/i/TopMan/TM33Q34SBLK_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM33Q34SBLK_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM33Q34SBLK_C_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM33Q34SBLK_B_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "summer",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "s"],
  },
  {
    id: 22,
    name: "Blue Stitch Knitted T-Shirt",
    images: [
      "https://images.topman.com/i/TopMan/TM81S18UGRN_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S18UGRN_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S18UGRN_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S18UGRN_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "summer",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "s"],
  },
  {
    id: 23,
    name: "Navy Colour Block Revere Knitted Shirt",
    images: [
      "https://images.topman.com/i/TopMan/TM81S12UMUL_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S12UMUL_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S12UMUL_D_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81S12UMUL_M_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "summer",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "s"],
  },
  {
    id: 24,
    name: "Light Blue Tiger Print Slim Shirt",
    images: [
      "https://images.topman.com/i/TopMan/TM83D19UMUL_M_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83D19UMUL_F_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83D19UMUL_B_1.jpg?$w500$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83D19UMUL_D_1.jpg?$w500$&fmt=webp&qlt=80",
    ],
    category: "summer",
    rating: 6,
    price: 112,
    discount: 0,
    badge: [],
    sizes: ["m", "l"],
  },
];

const client = contentful.createClient({
  accessToken: process.env["CMS_MANAGEMENT_API_KEY"],
});

async function init() {
  const space = await client.getSpace(process.env["CMS_SPACE_ID"]);
  const categoryMap = {};

  const category = await space.getEntries({
    content_type: "category",
  });
  category.items.forEach((item) => {
    categoryMap[item.fields.name["en"]] = item.sys.id;
  });

  async function createAndLinkAsset(name, url) {
    const resp = await space.createAsset({
      fields: {
        title: {
          en: name,
        },
        description: {
          en: `media for ${name}`,
        },
        file: {
          en: {
            contentType: "image/jpg",
            fileName: `${name}.jpg`,
            upload: url,
          },
        },
      },
    });
    const unPublishedAsset = await resp.processForLocale("en");
    const asset = await unPublishedAsset.publish();

    return {
      sys: {
        type: "Link",
        linkType: "Asset",
        id: asset.sys.id,
      },
    };
  }

  function Link(id) {
    return {
      sys: {
        type: "Link",
        linkType: "Entry",
        id,
      },
    };
  }

  async function seed(product) {
    let obj = {};

    for (let prop in product) {
      if (prop == "images") {
        const promiseArray = product[prop].map(async (url) => {
          Promise.resolve(sleep(10000));
          return createAndLinkAsset(product.name, url);
        });
        const imgs = await Promise.all(promiseArray);
        obj["images"] = {
          ["en"]: imgs,
        };
        continue;
      }
      if (prop == "category") {
        obj[prop] = {
          ["en"]: Link(categoryMap[product[prop]]),
        };
        continue;
      }

      obj[prop] = {
        ["en"]: product[prop],
      };
    }

    const entry = await space.createEntry("product", {
      fields: obj,
    });
    return entry.publish();
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  function generatePrice() {
    return Math.random() * 150 + 10;
  }
  const promiseArray = products.map((product) => {
    delete product["id"];
    delete product["rating"];
    product["price"] = Math.round(generatePrice());
    Promise.resolve(sleep(10000));

    return seed(product);
  });

  Promise.all(promiseArray).then(() => console.log("seeding completed"));
}

init();
