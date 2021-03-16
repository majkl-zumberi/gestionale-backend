import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { Order } from 'src/order/entities/order.entity';
import { getManager, Repository } from 'typeorm';
import { CreateDetailOrderDto } from './dto/create-detail-order.dto';
import { FormatDetailOrders } from './dto/format-detail-orders.dto';
import { UpdateDetailOrderDto } from './dto/update-detail-order.dto';
import { DetailOrder } from './entities/detail-order.entity';

@Injectable()
export class DetailOrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(DetailOrder)
    private detailRepository: Repository<DetailOrder>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(
    createDetailOrderDto: CreateDetailOrderDto,
    id_order: number,
    id_article: number,
  ) {
    const order = await this.orderRepository.findOne({ id: id_order });
    const article = await this.articleRepository.findOne({ id: id_article });
    const newDetail = await this.detailRepository.create({
      ...createDetailOrderDto,
      order: order,
      article: article,
    });
    return await this.detailRepository.save(newDetail);
  }

  findAll() {
    return this.detailRepository.find({ relations: ['order', 'article'] });
  }

  async findOne(id: number) {
    const detail = await this.detailRepository.findOne(id, {
      relations: ['order', 'article'],
    });
    if (detail) return detail;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `detail order not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async findByOrderId(id: number) {
    const detailOrdersByOrderId = await this.detailRepository.find({
      relations: ['order', 'article'],
      where: [
        {
          order: {
            id: id,
          },
        },
      ],
    });
    return FormatDetailOrders.formatOrders(detailOrdersByOrderId);
  }

  async update(id: number, updateDetailOrderDto: UpdateDetailOrderDto) {
    await this.detailRepository.update(id, updateDetailOrderDto);
    return this.findOne(id);
  }

  async statistics() {
    const entityManager = getManager();
    const someQuery = await entityManager.query(`
    SELECT c.articleId as id, a.name AS name, count(c.id) as recurrence, SUM(c.quantity) as total FROM article a
    LEFT JOIN detail_order c ON c.articleId = a.id
    GROUP BY a.id`);
    console.log({ someQuery });
    return someQuery;
    /**
     * SELECT c.articleId as id, a.name AS name, count(c.id) as total FROM article a
       LEFT JOIN detail_order c ON c.articleId = a.id
       GROUP BY a.id
     */
  }

  async updateByOrderId(
    orderId: number,
    articleId: number,
    updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    const detailByOrder = await this.detailRepository.findOne({
      relations: ['order', 'article'],
      where: [
        {
          order: {
            id: orderId,
          },
          article: {
            id: articleId,
          },
        },
      ],
    });
    await this.detailRepository.update(detailByOrder.id, updateDetailOrderDto);
  }
  async remove(id: number) {
    const updateDetailOrder = await this.findOne(id);

    this.detailRepository.delete(updateDetailOrder);
  }
}
