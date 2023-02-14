import SsllabsServerModule from "./SsllabsServerModule.ts";

export default new SsllabsServerModule({
  name: "Heart SSL Labs Server",
  service: {
    name: "Qualys SSL Labs Server",
    logo:
      "https://gitlab.com/fabernovel/heart/raw/master/assets/images/logos/SSLLabs.png?v=20190723",
  },
});
