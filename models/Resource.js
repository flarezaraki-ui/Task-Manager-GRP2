class Resource {
    constructor(title, subject, status, deadline, description) {
        this.title = title;
        this.subject = subject;
        this.status = status;
        this.deadline = deadline;
        this.description = description;
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Resource }