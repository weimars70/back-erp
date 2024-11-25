import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/create-usuario.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');
import * as ExcelJS from 'exceljs';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  async findAll(@Query() _params: any) {
    return await this.usuariosService.findAll(_params);
  }
  @Post('login')
  async getLogin(@Body() loginAuthDto: LoginAuthDto) {
    return await this.usuariosService.login(loginAuthDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return await this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Get('pdf/pdf')
  async generatePdf(@Res() res: Response): Promise<void> {
    // Realizar la consulta a la base de datos
    const data = await this.usuariosService.getData();
    // Generar el PDF
    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text('Resultado de la consulta:', 100, 100);
    // Agregar los datos al PDF
    /*data.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${item.cliente}: ${item.sector}`, 100, 150 + index * 20);
    });*/
    const table = {
      title: 'Tabla ejemplo',
      subtitle: 'Esta es una tabla de ejemplo',
      headers: ['Id', 'Nombre', 'Email', 'usuario'],
      rows: data.map((row) => [row.id, row.nombre, row.email, row.usuario]),
    };

    doc.table(table, {
      columnsSize: [100, 300, 200],
    });

    doc.end();
  }

  @Get('excel/excel')
  async generateExcel(@Res() res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

    const data = await this.usuariosService.getData();

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 40 },
      { header: 'Nombre', key: 'nombre', width: 100 },
      { header: 'Email', key: 'email', width: 100 },
      { header: 'Usuario', key: 'usuario', width: 100 },
    ];
    if (data) {
      worksheet.addRows(data);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.send(buffer);
  }
}
