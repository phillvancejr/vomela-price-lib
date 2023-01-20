interface QuotePair {
    print: number;
    plain: number;
}

interface Price {
    sf: number;
    price: number;
}

interface Total extends Price {
    print: Price;
    plain: Price;
}

function price(sf: number, cost: number): Price {
    cost *= sf;
    return { sf, price: cost };
}



function get_total(cost: QuotePair, sf: QuotePair): Total {
    const { print: print_cost, plain: plain_cost } = cost;
    const { print: print_sf, plain: plain_sf } = sf;

    const print = price(print_sf,print_cost);
    const plain = price(plain_sf,plain_cost);

    const total = {
        sf: print.sf + plain.sf,
        price: print.price + plain.price,
        print,
        plain, 
    };

    return total;
}

const Quote = (print_cost: number, plain_cost: number) => ({
    cost: { print: print_cost, plain: plain_cost },
    sf: { print: 0, plain: 0 },
    _total: {},

    print(sf: number) {
        this.sf.print = sf;
        return this;
    },
    plain(sf: number) {
        this.sf.plain = sf;
        return this;
    },
    total(){
        return get_total(this.cost, { print: this.sf.print, plain: this.sf.plain });
    }
});

export { Quote as default, get_total };

console.log(
    Quote(2,3)
        .print(10)
        .plain(10)
        .total()
)
    