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
    correctPageTexts();
});
function correctText(text) {
    return text.replaceAll(/Office(?=([ -]*365))/gi, "Microsoft");
}
function correctPageTexts() {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield webflow.getCurrentPage();
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
        const allElements = yield webflow.getAllElements();
        const strings = allElements.flatMap((el) => el.type === "String" ? [el] : []);
        strings.forEach((el, i) => __awaiter(this, void 0, void 0, function* () {
            let text = el.getText();
            console.log(el, el.type, text);
            el.setText(correctText(text));
            yield el.save();
        }));
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
