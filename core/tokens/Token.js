export class Token {
    type = 'unknown';
    match = '';
    length = 0
    params = {};
    childrens = [];

    static getInstance(obj) {
        const t = new Token();
        t.type = obj.type;
        t.match = obj.match;
        t.length = obj.length || (obj.match ? obj.match.length : 0);
        t.params = obj.params || {};
        t.childrens = obj.childrens || [];
        return t;
    }
}