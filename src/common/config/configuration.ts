

export default () => ({
    port: Number(process.env.PORT) || 3000,
    database : {
        type: 'postgres' as const,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        autoLoadEntities: true,
        synchronize: true,
    }
})