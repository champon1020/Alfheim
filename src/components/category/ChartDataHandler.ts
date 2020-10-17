import { CategoryIface } from "~/type";

// example
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#000"],
      hoverBackgroundColor: ["#FFA5B8", "#79BAE7", "#FFE39F", "#000"],
    },
  ],
};

class ChartDataHandler {
  private MAX_VIEW = 9;
  private categories = [] as CategoryIface[];
  private labels = [] as string[];
  private data = [] as number[];
  private total = 0;

  constructor(categories?: CategoryIface[]) {
    if (categories === undefined) return;
    this.categories = categories;
    this.handleData();
  }

  private sortCategories() {
    this.categories.sort(function (a, b) {
      return b.articleNum - a.articleNum;
    });
  }

  private handleData() {
    this.sortCategories();

    let dataArticleNum = 0;
    this.categories.forEach((v, i) => {
      if (i < this.MAX_VIEW) {
        this.data.push(v.articleNum);
        this.labels.push(v.name);
        dataArticleNum += v.articleNum;
      }

      this.total += v.articleNum;
    });

    if (this.categories.length >= this.MAX_VIEW - 1) {
      this.data.push(this.total - dataArticleNum);
      this.labels.push("Others");
    }
  }

  private reset() {
    this.labels = [];
    this.data = [];
    this.total = 0;
  }

  build(categories: CategoryIface[]) {
    this.categories = categories;
    this.reset();
    this.handleData();
  }

  getData() {
    return {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: [
            "#FE2E2E",
            "#FE9A2E",
            "#F7FE2E",
            "#2EFE2E",
            "#2EFEF7",
            "#2E9AFE",
            "#CC2EFA",
            "#FE2EC8",
            "#848484",
          ],
          hoverBackgroundColor: [
            "#F78181",
            "#F7BE81",
            "#F3F781",
            "#81F781",
            "#81F7F3",
            "#81BEF7",
            "#DA81F5",
            "#F781D8",
            "#D8D8D8",
          ],
        },
      ],
    };
  }
}

export default ChartDataHandler;
