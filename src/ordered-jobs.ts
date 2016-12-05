export class OrderedJobs {

    order(jobs: string) {
        if (!jobs) return "";
        return jobs[0];
    }
}