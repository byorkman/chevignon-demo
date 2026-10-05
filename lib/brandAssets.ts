/**
 * URLs de assets de Chevignon (chevignon.vtexassets.com) usadas por hot-link.
 * NO se re-uploadean: son referencias directas al CDN público del site real.
 * Los assets pertenecen a Chevignon / Comodin S.A.S. NIT 800.069.933-6.
 */

const CDN = "https://chevignon.vtexassets.com";
const FM = `${CDN}/assets/vtex.file-manager-graphql/images`;

export const brandAssets = {
  logo: `${CDN}/assets/vtex/assets-builder/chevignon.chevignon-store/8.8.6/icons/logo_brand_chevignon%20black___89f8de415847fa635fac956e1f8363a3.png`,
  trustSIC: `${CDN}/arquivos/Industria-Comercio.png`,
  trustETrust: `${CDN}/arquivos/etrust-costumer-logo.svg`,
  iconReturn: `${CDN}/arquivos/icon-return-promise-100-100.png`,

  // Banners de home (asignación por posición aproximada)
  heroMain: `${FM}/da915712-24fe-42d1-9a5b-fcb5c8f46a70___b4bae4c4a8fd795c85874de6476d0167.jpg`,
  heroSecondary: `${FM}/84b9b910-a667-4e87-8dd8-604bbae275ec___fb3686bc08d371a09ddbfef18eba4e8b.jpg`,

  // Tiles categoría (HOMBRE / MUJER / DENIM / CUERO)
  tileHombre: `${FM}/1edb3149-7354-4cb1-8f1d-d4560df585a5___e87339c335e99f6d3319907fd8cdc039.webp`,
  tileMujer: `${FM}/9d85209f-4970-42a6-b8a1-01fa50b7375b___a551a076d53a4ed2109f1e2ba8f8fa44.webp`,
  tileDenim: `${FM}/a113edf7-f7b5-4c21-8dad-26d1fbac88bf___b01ec99eaf5f9e01864ff0051dc19ecd.webp`,
  tileCuero: `${FM}/b2b507d1-2bca-4292-9b6c-ab79de697422___b38b700be4ecea2979ecc5c8bd6003e9.webp`,

  // Sección EXPLORA (3 tiles)
  exploraChaquetas: `${FM}/4f6eb622-3295-479f-a91f-2d0c1d74c8c3___045ea904a35cb9242775aab10f9a2798.jpg`,
  exploraZapatos: `${FM}/6cea3608-e438-4306-bd11-4e43de45fff7___c7b1779ec5f6583c09b7cbdfc59863b3.jpg`,
  exploraTejidos: `${FM}/74dee2a1-4818-43ef-9a2a-d0588ed7f3f9___3b6ad387783ef3f55f2ed4428b3728b6.jpg`,

  // Kids banner
  kidsBanner: `${FM}/56da5895-3c14-49a6-b9e9-0a51938494e5___660d323f3cc4661b63e874294f653a78.jpg`,

  // Nuestra Historia
  historia: `${FM}/2ebd6923-1b28-4be3-9836-33a852a5f02d___ee03fc072e39b5baa874e8c2795939a1.jpg`,
  historiaSecondary: `${FM}/bbaf710e-67c5-4767-a48e-6770994fcbdb___233cdf54b1047861a2b869ce9abce8b6.jpg`,

  // Premium Leather
  premiumLeather: `${FM}/bcaa2f90-c89f-4218-ba62-fb02154f994e___b9d120069146ecbd6e55eace25d13cf0.jpg`,

  // Denim
  denim: `${FM}/d6828625-522a-4a88-acc8-aafda04a9734___65569c7cb68db7e1676e2798da03cf93.jpg`,

  // Essentials
  essentials: `${FM}/ac92fee7-d765-4464-9040-fe971fc307c9___772dd85cdacf1189b8adf5694d92a427.jpg`,

  // Wide banners adicionales
  wide1: `${FM}/ae1db357-2081-49b9-818b-dbffed9a55d0___46773f4916344039f182c5d42e41c79d.jpg`,
  wide2: `${FM}/dfdd2ee4-f082-44cd-b075-929a61886bc3___ff401304d2871909c2ccca9910b69e88.jpg`,
  wide3: `${FM}/f1bd8e1c-6eb0-46b3-a7bd-14ce58711a90___0f5b772c67ddbfe9e40d4c3ea96c75e4.jpg`
};
