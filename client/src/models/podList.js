export class PodList {
  constructor(list) {
    this.list = list;
  }

  compareSubscribers(a, b) {
    return (a.subscribers < b.subscribers) ? 1 : -1;
  }

  filterList() {
      
    this.list.sort((a, b) => { //sort by url
      if (a.website === b.website) {
        return this.compareSubscribers(a, b);
      }
      return (a.website > b.website) ? 1 : -1;
    });

    let filteredPods = this.list.filter((pod, index) => { //remove duplicates
      return ((index === 0) || (pod.website !== this.list[index - 1].website));
    });

    filteredPods.sort((a, b) => {
      return this.compareSubscribers(a, b);
    });
    
    return filteredPods;
  }
}