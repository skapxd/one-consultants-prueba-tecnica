import { test } from '@playwright/test'
import Faker from 'faker'

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://one-consultants-prueba-tecnica-production-815c.up.railway.app/')

  const firstName = Faker.name.lastName()
  const lastName = Faker.name.lastName()
  const email = Faker.internet.email()

  const course = Faker.name.lastName()
  const teacher = Faker.name.firstName()
  const year = '2021'
  const period = 'Primer período'

  await page.getByPlaceholder('Primer nombre').fill(firstName)

  await page.getByPlaceholder('Primer apellido').fill(lastName)

  await page.getByPlaceholder('Correo electrónico').fill(email)

  await page.getByRole('button', { name: 'Siguiente' }).click()

  await page.getByPlaceholder('Curso').fill(course)

  await page.getByPlaceholder('Profesor').fill(teacher)

  await page.getByText('Año').click()
  await page.getByText(year).click()

  await page.locator('#periods summary').click()
  await page.getByText(period).click()

  await page.getByRole('button', { name: 'Siguiente' }).click()

  await page.getByRole('button', { name: 'Guardar' }).click()

  await page.getByRole('button', { name: 'Aceptar' }).click()

  await page.getByRole('gridcell', { name: firstName }).first().click()
  await page.getByRole('gridcell', { name: lastName }).click()
  await page.getByRole('gridcell', { name: email }).click()

  await page.getByRole('gridcell', { name: course }).click()
  await page.getByRole('gridcell', { name: teacher }).click()
  await page.getByRole('gridcell', { name: year }).last().click()
  await page.getByRole('gridcell', { name: period }).last().click()

  await page.close()
  // Expects the URL to contain intro.
})
