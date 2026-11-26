<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyReaderEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public string $code,
        public string $verifyUrl,
        public ?string $senderEmail = null,
        public ?string $senderName = null
    ) {}

    public function envelope(): Envelope
    {
        $mailConfig = $this->user->tenant?->website_config['mail'] ?? [];

        $fromAddress = $this->senderEmail 
            ?? $mailConfig['from_address'] 
            ?? config('mail.from.address', 'noreply@mediaos.io');

        $fromName = $this->senderName 
            ?? $mailConfig['from_name'] 
            ?? config('mail.from.name', 'MediaOS Security');

        $replyTo = $mailConfig['reply_to'] ?? null;

        $envelope = new Envelope(
            from: new Address($fromAddress, $fromName),
            subject: 'Verify Your Email Address — MediaOS Reader Account',
        );

        if ($replyTo) {
            $envelope->replyTo = [new Address($replyTo, $fromName)];
        }

        return $envelope;
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.verify-reader-email',
        );
    }
}
