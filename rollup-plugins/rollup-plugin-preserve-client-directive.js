module.exports = function preserveUseClientDirective(options = {}) {
    return {
        name: 'preserve-use-client-directive',
        transform(code, id) {
            return {
                code: code.replace(/"use client";/g, '"use client";\n'),
                map: null
            };
        }
    };
}