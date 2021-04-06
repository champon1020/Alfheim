import { ITag } from "~/interfaces";

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
  private tags = [] as ITag[];
  private labels = [] as string[];
  private data = [] as number[];
  private total = 0;

  constructor(tags?: ITag[]) {
    if (tags == null) return;
    this.tags = tags;
    this.handleData();
  }

  private sortTags() {
    this.tags.sort(function (a, b) {
      return b.nArticles - a.nArticles;
    });
  }

  private handleData() {
    this.sortTags();

    let numArticles = 0;
    this.tags.forEach((t, i) => {
      if (i < this.MAX_VIEW) {
        this.data.push(t.nArticles);
        this.labels.push(t.name);
        numArticles += t.nArticles;
      }

      this.total += t.nArticles;
    });

    if (this.tags.length >= this.MAX_VIEW - 1) {
      this.data.push(this.total - numArticles);
      this.labels.push("Others");
    }
  }

  private reset() {
    this.labels = [];
    this.data = [];
    this.total = 0;
  }

  build(tags: ITag[]) {
    this.tags = tags;
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
