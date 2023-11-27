document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();
  correctPageTexts();
};

function correctText(text) {
  return text.replaceAll(/Office(?=([ -]*365))/gi, "Microsoft");
}

async function correctPageTexts() {
    const page = await webflow.getCurrentPage();
    let name = page.getName();
    let title = page.getTitle();
    let desc = page.getDescription();
    let slug = page.getSlug();
    console.log(name, title, desc, slug);
  
    page.setName(correctText(name));
    page.setTitle(correctText(title));
    page.setDescription(correctText(desc));
    page.setSlug(correctText(slug));
    page.save().then(() => console.log("Page SEO fields changed"));
  
    const allElements = await webflow.getAllElements();
    const strings = allElements.flatMap((el) =>
      el.type === "String" ? [el] : []
    );
  
    strings.forEach(async (el, i) => {
      let text = el.getText();
      console.log(el, el.type, text);
      el.setText(correctText(text));
      await el.save();
    });

}

// async function loopThroughPages(i = 1) {
//   console.log(i)
//   const items = await webflow.getAllPagesAndFolders();
//   const item = items[i];
//   if (item.type === "Page") {
//     i++;
//     await switchPageAndDo(item, correctPageTexts, i);
//   }
// }

// async function switchPageAndDo(page, func, i) {
//   return new Promise(async function (resolve) {
//     await webflow.switchPage(page);
//     const success = await func.apply();
//     resolve(success);
//   }).then(value => loopThroughPages(i));
// }
