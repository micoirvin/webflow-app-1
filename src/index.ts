document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();
  const allElements = await webflow.getAllElements();
  const strings = allElements.flatMap(el => el.type === "String" ? [el] : []);
  // document.getElementById("text").innerText = JSON.stringify(divs);

  function correctText(text) {
    return text.replaceAll(/Office(?=([ -]*365))/ig, "Microsoft");
  }

  function correctPageTexts(page) {
    let name = page.getName();
    let title = page.getTitle();
    let desc = page.getDescription();
    let slug = page.getSlug();
    console.log(name, title, desc, slug)
    // page.setName(correctText(name));
    // page.setTitle(correctText(title));
    page.setDescription(correctText(desc));
    // page.setSlug(correctText(slug));
    page.save().then(() => console.log("OKAY"))
  }

  strings.forEach(async (el) => {
    let text = el.getText();
    console.log(el, el.type, text)
    el.setText(correctText(text));
    await el.save();
  });

  // const items = await webflow.getAllPagesAndFolders();
  // items.forEach((item) => {
  //   // Process each page or folder
  //   if (item.type === "Page") {
  //     correctPageTexts(item);
  //   }
  // });

  const currentPage = await webflow.getCurrentPage();
  correctPageTexts(currentPage)
};
