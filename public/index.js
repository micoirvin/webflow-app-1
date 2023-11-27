var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById("lorem").onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    const allElements = yield webflow.getAllElements();
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
        console.log(name, title, desc, slug);
        // page.setName(correctText(name));
        // page.setTitle(correctText(title));
        page.setDescription(correctText(desc));
        // page.setSlug(correctText(slug));
        page.save().then(() => console.log("OKAY"));
    }
    strings.forEach((el) => __awaiter(this, void 0, void 0, function* () {
        let text = el.getText();
        console.log(el, el.type, text);
        el.setText(correctText(text));
        yield el.save();
    }));
    // const items = await webflow.getAllPagesAndFolders();
    // items.forEach((item) => {
    //   // Process each page or folder
    //   if (item.type === "Page") {
    //     correctPageTexts(item);
    //   }
    // });
    const currentPage = yield webflow.getCurrentPage();
    correctPageTexts(currentPage);
});
