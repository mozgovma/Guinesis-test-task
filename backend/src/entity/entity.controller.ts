import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';


@Controller('api/entity')
export class EntityController {
  @Post()
  async createEntity(@Body() body: { entityType: string }) {
    console.log('createEntity был вызван с body:', body);
    
    if (!body.entityType) {
      throw new InternalServerErrorException('entityType не указан');
    }

    const token = await this.getToken();
    
    try {
      const response = await axios.post(`https://test.gnzs.ru/api/v4/${body.entityType}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        id: response.data.id,
        name: response.data.name,
      };
    } 
    catch (error) {
      console.error('Ошибка при запросе к API:', error.response?.data || error.message);
    }
  }

  private async getToken() {
    try {
      const response = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
        headers: {
          'X-Client-Id': '31992158',
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.access_token;
      console.log('Полученный токен:', token);
      return token;
    } catch (error) {
      console.error('Ошибка при получении токена:', error.response?.data || error.message);
      throw new InternalServerErrorException('Не удалось получить токен');
    }
  }
}
