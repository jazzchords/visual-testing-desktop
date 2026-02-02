import { test, expect } from '@playwright/test';

const URL_DO_APP = 'https://moises-live-ui-v3.vercel.app/v3';

test('Fluxo Completo de UI (4 Estados)', async ({ page }) => {
  
  // Acessa o app
  await page.goto(URL_DO_APP);
  await page.waitForLoadState('networkidle');

  // --- ESTADO 1: WELCOME SCREEN ---
  await test.step('1. Tela de Boas Vindas', async () => {
    // Valida se estamos na tela certa procurando pelo texto
    await expect(page.getByText('Welcome to Moises Live')).toBeVisible();
    
    // Tira o print
    await expect(page).toHaveScreenshot('01-welcome-screen.png');
  });

  // Ação: Clicar em "Continue" para ir para a próxima tela
  // O Playwright procura um botão com o texto "Continue" (case insensitive)
  await page.getByRole('button', { name: 'Continue' }).click();

  // --- ESTADO 2: TOGGLE OFF (Main Screen) ---
    await test.step('2. Tela Principal (Toggle Desligado)', async () => {
        // Aumentei o timeout aqui só pra garantir que a tela carregou bem
        await expect(page.getByText('Turn on AI volume control')).toBeVisible({ timeout: 10000 });
        
        // Tira o print (se já existir o antigo, ele compara)
        await expect(page).toHaveScreenshot('02-main-toggle-off.png');
      });
    
      // Ação: Ligar o Toggle (CORRIGIDO)
      // Agora clicamos direto no componente "switch" que o log nos mostrou
      await page.getByRole('switch', { name: 'Toggle Switch for AI Volume Control' }).click();
      
    
      // --- ESTADO 3: MUSIC TAB (Default) ---
      await test.step('3. Aba Music (Padrão)', async () => {
        // Dica de Mentor: Depois de uma ação que muda a tela (como ligar o toggle),
        // é bom esperar um pouquinho antes de procurar o próximo elemento.
        await page.waitForTimeout(1000); 
        
        // Confirma que a aba Music está visível
        await expect(page.getByText('Music')).toBeVisible();
        await expect(page.getByText('Vocals')).toBeVisible(); 
    
        // Tira o print
        await expect(page).toHaveScreenshot('03-music-tab.png');
      });

   // --- ESTADO 4: SPEECH TAB ---
   await test.step('4. Aba Speech', async () => {
    // Clica na aba Speech
    await page.getByText('Speech').click();
    
    
    await expect(page.getByText('Vocals')).toBeVisible({ timeout: 15000 });
    
    // Garantir que a animação terminou totalmente
    await page.waitForTimeout(1000); 

    // Tira o print final
    await expect(page).toHaveScreenshot('04-speech-tab.png');
  });
});