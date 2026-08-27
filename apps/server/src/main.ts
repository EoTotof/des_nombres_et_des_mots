import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
