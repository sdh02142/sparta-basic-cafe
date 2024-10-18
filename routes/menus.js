import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

const router = express.Router();

router.get('/stats', async (req, res, next) => {
    const total = await prisma.orderHistory.groupBy({
        by: ['menu_id'],
        _count: {
            menu_id: true,
        },
    });

    var toOr = 0;
    for(let i = 0; i < total.length; i++){
        toOr = toOr + total[i]['_count']['menu_id'];
    };
    const toMe = total.length;

    console.log(toMe);
    console.log(toOr);

    res.status(200).json({
        stats: {
            totalMenus: toMe,
            totalOrders: toOr,
            totalSales: 30000
        }
    });
});

router.get('/', async (req, res, next) => {
    const orderList = await prisma.menu.findMany({
    });

    res.status(200).json({
        menus: orderList
        // [
        //     {
        //         id: 1,
        //         name: 'Latte',
        //         type: 'Coffee',
        //         temperature: 'hot',
        //         price: 4500,
        //         totalOrders: 5
        //     },
        //     {
        //         id: 2,
        //         name: 'Iced Tea',
        //         type: 'Tea',
        //         temperature: 'ice',
        //         price: 3000,
        //         totalOrders: 10
        //     }
        // ]
    });
});

export default router;
