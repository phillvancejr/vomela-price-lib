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
export default function get_total(cost: QuotePair, sf: QuotePair): Total {
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

